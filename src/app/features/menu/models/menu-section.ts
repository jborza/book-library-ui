export type MenuSection = {
  title: string;
  items: Array<{
    name: string;
    url: string;
    icon: string;
    queryParams?: { [key: string]: any };
  }>;
};