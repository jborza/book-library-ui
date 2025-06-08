export type MenuSection = {
  title: string;
  collapsible: boolean;
  expanded: boolean;
  items: Array<{
    name: string;
    url: string;
    icon: string;
    queryParams?: { [key: string]: any };
  }>;
};