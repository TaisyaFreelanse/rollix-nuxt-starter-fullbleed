
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AddressMapPicker: typeof import("../components/AddressMapPicker.vue")['default']
export const AdminLoginModal: typeof import("../components/AdminLoginModal.vue")['default']
export const BannerCarousel: typeof import("../components/BannerCarousel.vue")['default']
export const BottomNavigation: typeof import("../components/BottomNavigation.vue")['default']
export const CartItem: typeof import("../components/CartItem.vue")['default']
export const CartSidebar: typeof import("../components/CartSidebar.vue")['default']
export const CategorySection: typeof import("../components/CategorySection.vue")['default']
export const ChatButton: typeof import("../components/ChatButton.vue")['default']
export const CookieBar: typeof import("../components/CookieBar.vue")['default']
export const FloatingCartButton: typeof import("../components/FloatingCartButton.vue")['default']
export const FooterBar: typeof import("../components/FooterBar.vue")['default']
export const HeaderBar: typeof import("../components/HeaderBar.vue")['default']
export const HorizontalCategoryMenu: typeof import("../components/HorizontalCategoryMenu.vue")['default']
export const LoadingSpinner: typeof import("../components/LoadingSpinner.vue")['default']
export const MobileSidebar: typeof import("../components/MobileSidebar.vue")['default']
export const Modal: typeof import("../components/Modal.vue")['default']
export const Overlay: typeof import("../components/Overlay.vue")['default']
export const ProductCard: typeof import("../components/ProductCard.vue")['default']
export const ProductCardSkeleton: typeof import("../components/ProductCardSkeleton.vue")['default']
export const ProductModal: typeof import("../components/ProductModal.vue")['default']
export const ProfileAddresses: typeof import("../components/Profile/ProfileAddresses.vue")['default']
export const ProfileBonuses: typeof import("../components/Profile/ProfileBonuses.vue")['default']
export const ProfileOrders: typeof import("../components/Profile/ProfileOrders.vue")['default']
export const PromocodeCard: typeof import("../components/PromocodeCard.vue")['default']
export const SidebarMenu: typeof import("../components/SidebarMenu.vue")['default']
export const SkeletonLoader: typeof import("../components/SkeletonLoader.vue")['default']
export const SmsAuth: typeof import("../components/SmsAuth.vue")['default']
export const ToastContainer: typeof import("../components/ToastContainer.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAddressMapPicker: LazyComponent<typeof import("../components/AddressMapPicker.vue")['default']>
export const LazyAdminLoginModal: LazyComponent<typeof import("../components/AdminLoginModal.vue")['default']>
export const LazyBannerCarousel: LazyComponent<typeof import("../components/BannerCarousel.vue")['default']>
export const LazyBottomNavigation: LazyComponent<typeof import("../components/BottomNavigation.vue")['default']>
export const LazyCartItem: LazyComponent<typeof import("../components/CartItem.vue")['default']>
export const LazyCartSidebar: LazyComponent<typeof import("../components/CartSidebar.vue")['default']>
export const LazyCategorySection: LazyComponent<typeof import("../components/CategorySection.vue")['default']>
export const LazyChatButton: LazyComponent<typeof import("../components/ChatButton.vue")['default']>
export const LazyCookieBar: LazyComponent<typeof import("../components/CookieBar.vue")['default']>
export const LazyFloatingCartButton: LazyComponent<typeof import("../components/FloatingCartButton.vue")['default']>
export const LazyFooterBar: LazyComponent<typeof import("../components/FooterBar.vue")['default']>
export const LazyHeaderBar: LazyComponent<typeof import("../components/HeaderBar.vue")['default']>
export const LazyHorizontalCategoryMenu: LazyComponent<typeof import("../components/HorizontalCategoryMenu.vue")['default']>
export const LazyLoadingSpinner: LazyComponent<typeof import("../components/LoadingSpinner.vue")['default']>
export const LazyMobileSidebar: LazyComponent<typeof import("../components/MobileSidebar.vue")['default']>
export const LazyModal: LazyComponent<typeof import("../components/Modal.vue")['default']>
export const LazyOverlay: LazyComponent<typeof import("../components/Overlay.vue")['default']>
export const LazyProductCard: LazyComponent<typeof import("../components/ProductCard.vue")['default']>
export const LazyProductCardSkeleton: LazyComponent<typeof import("../components/ProductCardSkeleton.vue")['default']>
export const LazyProductModal: LazyComponent<typeof import("../components/ProductModal.vue")['default']>
export const LazyProfileAddresses: LazyComponent<typeof import("../components/Profile/ProfileAddresses.vue")['default']>
export const LazyProfileBonuses: LazyComponent<typeof import("../components/Profile/ProfileBonuses.vue")['default']>
export const LazyProfileOrders: LazyComponent<typeof import("../components/Profile/ProfileOrders.vue")['default']>
export const LazyPromocodeCard: LazyComponent<typeof import("../components/PromocodeCard.vue")['default']>
export const LazySidebarMenu: LazyComponent<typeof import("../components/SidebarMenu.vue")['default']>
export const LazySkeletonLoader: LazyComponent<typeof import("../components/SkeletonLoader.vue")['default']>
export const LazySmsAuth: LazyComponent<typeof import("../components/SmsAuth.vue")['default']>
export const LazyToastContainer: LazyComponent<typeof import("../components/ToastContainer.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
