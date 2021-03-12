import { transformRoute } from '@umijs/route-utils';

import type { MenuDataItem, Route, MessageDescriptor } from '../typings';

function fromEntries(iterable: any) {
  return [...iterable].reduce((obj: Record<string, MenuDataItem>, [key, val]) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = val;
    return obj;
  }, {});
}

export default (
  routes: Route[],
  menu?: { locale?: boolean },
  formatMessage?: (message: MessageDescriptor) => string,
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[],
) => {
  // 解决头层菜单需要有分组的展示情况由于transformRoute的方法会导致父亲属性嫁接给子集所以这里这样操作
  const keyMap = new Map();
  const routerfilterKey = (arr: Route[], stringKey: string) => {
    const filterKey = (arrRouter: Route[]) => {
      arrRouter.forEach((item) => {
        if (item.hasOwnProperty(stringKey) || item[stringKey]) {
          keyMap.set(item.path, item[stringKey]);
          // eslint-disable-next-line
          delete item[stringKey];
        }
        if (item.routes) {
          filterKey(item.routes);
        }
      });
    };
    filterKey(arr);
  };
  routerfilterKey(routes, 'group');
  const { menuData, breadcrumb } = transformRoute(
    routes,
    menu?.locale || false,
    formatMessage,
    true,
  );
  const routerAddKey = (arr: Route[], stringKey: string) => {
    const filterKey = (arrRouter: Route[]) => {
      arrRouter.forEach((item) => {
        if (keyMap.has(item.path)) {
          // eslint-disable-next-line
          item[stringKey] = keyMap.get(item.path);
        }
        if (item.routes) {
          filterKey(item.routes);
        }
      });
    };
    filterKey(arr);
  };
  routerAddKey(menuData, 'group');
  routerAddKey(routes, 'group');
  if (!menuDataRender) {
    return {
      breadcrumb: fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData,
    };
  }
  const renderData = transformRoute(
    menuDataRender(menuData),
    menu?.locale || false,
    formatMessage,
    true,
  );
  return {
    breadcrumb: fromEntries(renderData.breadcrumb),
    breadcrumbMap: renderData.breadcrumb,
    menuData: renderData.menuData,
  };
};
