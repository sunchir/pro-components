import './index.less';
import Icon, { createFromIconfontCN, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { isUrl, isImg } from '@ant-design/pro-utils';

import type { MenuTheme, MenuProps } from 'antd';
import type { PureSettings } from '../../defaultSettings';
import defaultSettings from '../../defaultSettings';
import { getOpenKeysFromMenuData } from '../../utils/utils';

import type { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from '../../typings';
import MenuCounter from './Counter';
import type { PrivateSiderMenuProps } from './SiderMenu';
import PageLoading from '../PageLoading';

// todo
export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export type BaseMenuProps = {
  className?: string;
  /** 默认的是否展开，会受到 breakpoint 的影响 */
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  handleOpenChange?: (openKeys: string[]) => void;
  iconPrefixes?: string;
  /** 要给菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/ */
  menuProps?: MenuProps;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
        onClick: () => void;
      },
      defaultDom: React.ReactNode,
    ) => React.ReactNode
  >;
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes<Route>> &
  Omit<MenuProps, 'openKeys' | 'onOpenChange' | 'title'> &
  Partial<PureSettings>;

const { SubMenu, ItemGroup } = Menu;

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (
  icon?: string | React.ReactNode,
  iconPrefixes: string = 'icon-',
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return (
        <Icon component={() => <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />} />
      );
    }
    if (icon.startsWith(iconPrefixes)) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

class MenuUtil {
  constructor(props: BaseMenuProps) {
    this.props = props;
  }

  props: BaseMenuProps;

  getNavMenuItems = (menusData: MenuDataItem[] = [], isChildren: boolean): React.ReactNode[] => {
    return menusData.map((item) => this.getSubMenuOrItem(item, isChildren)).filter((item) => item);
  };

  /** Get SubMenu or Item */
  getSubMenuOrItem = (item: MenuDataItem, isChildren: boolean): React.ReactNode => {
    const { prefixCls } = this.props;
    if (Array.isArray(item.children) && item && item.children.length > 0) {
      const name = this.getIntlName(item);
      const { subMenuItemRender, menu, iconPrefixes } = this.props;
      //  get defaultTitle by menuItemRender
      const defaultTitle = item.icon ? (
        <span className={`${prefixCls}-menu-item`} title={name}>
          {!isChildren && getIcon(item.icon, iconPrefixes)}
          <span className={`${prefixCls}-menu-item-title`}>{name}</span>
        </span>
      ) : (
        <span className={`${prefixCls}-menu-item`} title={name}>
          {name}
        </span>
      );
      // subMenu only title render
      const title = subMenuItemRender
        ? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
        : defaultTitle;
      const MenuComponents: React.ElementType = menu?.type === 'group' ? ItemGroup : SubMenu;
      if (item.group) {
        const itemTitleRender = item.group;
        return (
          <Menu.ItemGroup title={itemTitleRender} key={`${item.key || item.path}-${title}`}>
            <MenuComponents
              title={title}
              key={item.key || item.path}
              onTitleClick={item.onTitleClick}
            >
              {this.getNavMenuItems(item.children, true)}
            </MenuComponents>
          </Menu.ItemGroup>
        );
      }
      return (
        <MenuComponents title={title} key={item.key || item.path} onTitleClick={item.onTitleClick}>
          {this.getNavMenuItems(item.children, true)}
        </MenuComponents>
      );
    }
    let itemTitleRender = item.group ? item.group : null;

    if (item.iconCollapse && item.onTitleClick) {
      itemTitleRender = (
        <div
          onClick={(e) => {
            e.preventDefault();
            item.onTitleClick();
          }}
        >
          {item.group}
          <span className={`${prefixCls}-menu-item-title-collapsible`}>
            <span className={`${prefixCls}-menu-item-title-collapsible-blank`}>
              <span className={`${prefixCls}-menu-item-title-collapsible-blank-content`}></span>
            </span>
            <span className={`${prefixCls}-menu-item-title-collapsible-container`}>
              {item.iconCollapse}
            </span>
          </span>
        </div>
      );
    }

    return itemTitleRender ? (
      <Menu.ItemGroup title={itemTitleRender} key={item.key || item.path}>
        <Menu.Item disabled={item.disabled} key={item.key || item.path} onClick={item.onTitleClick}>
          {this.getMenuItemPath(item, isChildren)}
        </Menu.Item>{' '}
      </Menu.ItemGroup>
    ) : (
      <Menu.Item disabled={item.disabled} key={item.key || item.path} onClick={item.onTitleClick}>
        {this.getMenuItemPath(item, isChildren)}
      </Menu.Item>
    );
  };

  getIntlName = (item: MenuDataItem) => {
    const { name, locale } = item;
    const { menu, formatMessage } = this.props;
    if (locale && menu?.locale !== false) {
      return formatMessage?.({
        id: locale,
        defaultMessage: name,
      });
    }
    return name;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a Judge whether it is http link.return a or Link
   *
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: MenuDataItem, isChildren: boolean) => {
    const itemPath = this.conversionPath(item.path || '/');
    const {
      location = { pathname: '/' },
      isMobile,
      onCollapse,
      menuItemRender,
      iconPrefixes,
    } = this.props;
    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    const { prefixCls } = this.props;
    const icon = isChildren ? null : getIcon(item.icon, iconPrefixes);
    let defaultItem = (
      <span className={`${prefixCls}-menu-item`}>
        {icon}
        <span className={`${prefixCls}-menu-item-title`}>{name}</span>
      </span>
    );
    const isHttpUrl = isUrl(itemPath);

    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <span
          title={name}
          onClick={() => {
            window.open(itemPath);
          }}
          className={`${prefixCls}-menu-item ${prefixCls}-menu-item-link`}
        >
          {icon}
          <span className={`${prefixCls}-menu-item-title`}>{name}</span>
        </span>
      );
    }

    if (menuItemRender) {
      const renderItemProps = {
        ...item,
        isUrl: isHttpUrl,
        itemPath,
        isMobile,
        replace: itemPath === location.pathname,
        onClick: () => onCollapse && onCollapse(true),
      };
      return menuItemRender(renderItemProps, defaultItem);
    }
    return defaultItem;
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
}

/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 *
 * @param BaseMenuProps
 */
const getOpenKeysProps = (
  openKeys: React.ReactText[] | false,
  { layout, collapsed }: BaseMenuProps,
): {
  openKeys?: undefined | string[];
} => {
  let openKeysProps = {};
  if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
    openKeysProps = {
      openKeys,
    };
  }
  return openKeysProps;
};

const BaseMenu: React.FC<BaseMenuProps & PrivateSiderMenuProps> = (props) => {
  const {
    theme,
    mode,
    className,
    handleOpenChange,
    style,
    menuData,
    menu,
    matchMenuKeys,
    iconfontUrl,
    collapsed,
    onCollapse,
    selectedKeys: propsSelectedKeys,
    onSelect,
    openKeys: propsOpenKeys,
    collapseTop,
  } = props;

  // 用于减少 defaultOpenKeys 计算的组件
  const defaultOpenKeysRef = useRef<string[]>([]);

  const { flatMenuKeys } = MenuCounter.useContainer();
  const [defaultOpenAll, setDefaultOpenAll] = useState(menu?.defaultOpenAll);

  const [openKeys, setOpenKeys] = useMergedState<WithFalse<React.Key[]>>(
    () => {
      if (menu?.defaultOpenAll) {
        return getOpenKeysFromMenuData(menuData) || [];
      }
      if (propsOpenKeys === false) {
        return false;
      }
      return [];
    },
    {
      value: propsOpenKeys === false ? undefined : propsOpenKeys,
      onChange: handleOpenChange as any,
    },
  );

  const [selectedKeys, setSelectedKeys] = useMergedState<string[] | undefined>([], {
    value: propsSelectedKeys,
    onChange: onSelect
      ? (keys) => {
          if (onSelect && keys) {
            onSelect(keys as any);
          }
        }
      : undefined,
  });

  useEffect(() => {
    if (menu?.defaultOpenAll || propsOpenKeys === false || flatMenuKeys.length) {
      return;
    }
    if (matchMenuKeys) {
      setOpenKeys(matchMenuKeys);
      setSelectedKeys(matchMenuKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-')]);

  useEffect(() => {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }, [iconfontUrl]);

  useEffect(() => {
    // if pathname can't match, use the nearest parent's key
    if (matchMenuKeys.join('-') !== (selectedKeys || []).join('-')) {
      setSelectedKeys(matchMenuKeys);
    }
    if (
      !defaultOpenAll &&
      propsOpenKeys !== false &&
      matchMenuKeys.join('-') !== (openKeys || []).join('-')
    ) {
      let newKeys: React.Key[] = matchMenuKeys;
      // 如果不自动关闭，我需要把 openKeys 放进去
      if (menu?.autoClose === false) {
        newKeys = Array.from(new Set([...matchMenuKeys, ...(openKeys || [])]));
      }
      setOpenKeys(newKeys);
    } else if (flatMenuKeys.length > 0) setDefaultOpenAll(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-'), collapsed]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openKeysProps = useMemo(() => getOpenKeysProps(openKeys, props), [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    openKeys && openKeys.join(','),
    props.layout,
    props.collapsed,
  ]);

  const [menuUtils] = useState(() => new MenuUtil(props));

  if (menu?.loading) {
    return <PageLoading />;
  }

  const cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal',
  });

  // sync props
  menuUtils.props = props;

  // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二此不会使用，所以用了 defaultOpenKeys
  // 这里返回 null，是为了让 defaultOpenKeys 生效
  if (props.openKeys === false && !props.handleOpenChange) {
    defaultOpenKeysRef.current = matchMenuKeys;
  }

  const finallyData = props.postMenuData ? props.postMenuData(menuData) : menuData;

  if (finallyData && finallyData?.length < 1) {
    return null;
  }
  if (collapseTop && menuData && menuData?.length > 0) {
    menuData[0] = {
      ...{
        iconCollapse: collapsed ? <RightOutlined /> : <LeftOutlined />,
        onTitleClick: () => (onCollapse ? onCollapse(!collapsed) : null),
      },
      ...menuData[0],
    };
  }
  return (
    <Menu
      {...openKeysProps}
      key="Menu"
      mode={mode}
      defaultOpenKeys={defaultOpenKeysRef.current}
      theme={theme}
      selectedKeys={selectedKeys}
      style={style}
      className={cls}
      onOpenChange={setOpenKeys}
      {...props.menuProps}
    >
      {menuUtils.getNavMenuItems(finallyData, false)}
    </Menu>
  );
};

BaseMenu.defaultProps = {
  postMenuData: (data) => data || [],
};

export default BaseMenu;
