// lib/components/ui/sidebar/index.ts
import {useSidebar} from "./context.svelte.js";
import SidebarContent from "./sidebar-content.svelte";
import SidebarFooter from "./sidebar-footer.svelte";
import SidebarGroupAction from "./sidebar-group-action.svelte";
import SidebarGroupContent from "./sidebar-group-content.svelte";
import SidebarGroupLabel from "./sidebar-group-label.svelte";
import SidebarGroup from "./sidebar-group.svelte";
import SidebarHeader from "./sidebar-header.svelte";
import SidebarInput from "./sidebar-input.svelte";
import SidebarInset from "./sidebar-inset.svelte";
import SidebarMenuAction from "./sidebar-menu-action.svelte";
import SidebarMenuBadge from "./sidebar-menu-badge.svelte";
import SidebarMenuButton from "./sidebar-menu-button.svelte";
import SidebarMenuItem from "./sidebar-menu-item.svelte";
import SidebarMenuSkeleton from "./sidebar-menu-skeleton.svelte";
import SidebarMenuSubButton from "./sidebar-menu-sub-button.svelte";
import SidebarMenuSubItem from "./sidebar-menu-sub-item.svelte";
import SidebarMenuSub from "./sidebar-menu-sub.svelte";
import SidebarMenu from "./sidebar-menu.svelte";
import SidebarProvider from "./sidebar-provider.svelte";
import SidebarRail from "./sidebar-rail.svelte";
import SidebarSeparator from "./sidebar-separator.svelte";
import SidebarTrigger from "./sidebar-trigger.svelte";
import SidebarRoot from "./sidebar.svelte";

export const Sidebar = {
    Root: SidebarRoot,
    Content: SidebarContent,
    Footer: SidebarFooter,
    Group: SidebarGroup,
    GroupAction: SidebarGroupAction,
    GroupContent: SidebarGroupContent,
    GroupLabel: SidebarGroupLabel,
    Header: SidebarHeader,
    Input: SidebarInput,
    Inset: SidebarInset,
    Menu: SidebarMenu,
    MenuAction: SidebarMenuAction,
    MenuBadge: SidebarMenuBadge,
    MenuButton: SidebarMenuButton,
    MenuItem: SidebarMenuItem,
    MenuSkeleton: SidebarMenuSkeleton,
    MenuSub: SidebarMenuSub,
    MenuSubButton: SidebarMenuSubButton,
    MenuSubItem: SidebarMenuSubItem,
    Provider: SidebarProvider,
    Rail: SidebarRail,
    Separator: SidebarSeparator,
    Trigger: SidebarTrigger
};

export {useSidebar};

export {
    SidebarRoot,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger
};