export enum SideBarItemType {
    Link = 'link',
    Divider = 'divider',
}

export interface SideBarLinkItem {
    type: SideBarItemType.Link
    text: string
    icon: string
    route: string
}

export interface SideBarDividerItem {
    type: SideBarItemType.Divider
}

const config: Array<SideBarLinkItem | SideBarDividerItem> = [
    {
        type: SideBarItemType.Link,
        text: 'Home',
        icon: 'home',
        route: '/',
    },
    {
        type: SideBarItemType.Divider,
    },
    {
        type: SideBarItemType.Link,
        text: 'Dishes',
        icon: 'local_dining',
        route: '/dishes',
    },
    {
        type: SideBarItemType.Link,
        text: 'Recipes',
        icon: 'kitchen',
        route: '/recipes',
    },
    {
        type: SideBarItemType.Link,
        text: 'Ingredients',
        icon: 'fastfood',
        route: '/ingredients',
    },
    {
        type: SideBarItemType.Link,
        text: 'Menu Builder',
        icon: 'menu_book',
        route: '/menu-builder',
    },
    {
        type: SideBarItemType.Divider,
    },
    {
        type: SideBarItemType.Link,
        text: 'Contact',
        icon: 'phone',
        route: '/contact',
    },
]

export default config
