
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

interface _GlobalComponents {
  'AddressMapPicker': typeof import("../../components/AddressMapPicker.vue")['default']
  'AdminLoginModal': typeof import("../../components/AdminLoginModal.vue")['default']
  'BannerCarousel': typeof import("../../components/BannerCarousel.vue")['default']
  'BottomNavigation': typeof import("../../components/BottomNavigation.vue")['default']
  'CartItem': typeof import("../../components/CartItem.vue")['default']
  'CartSidebar': typeof import("../../components/CartSidebar.vue")['default']
  'CategorySection': typeof import("../../components/CategorySection.vue")['default']
  'ChatButton': typeof import("../../components/ChatButton.vue")['default']
  'CookieBar': typeof import("../../components/CookieBar.vue")['default']
  'FloatingCartButton': typeof import("../../components/FloatingCartButton.vue")['default']
  'FooterBar': typeof import("../../components/FooterBar.vue")['default']
  'HeaderBar': typeof import("../../components/HeaderBar.vue")['default']
  'HorizontalCategoryMenu': typeof import("../../components/HorizontalCategoryMenu.vue")['default']
  'LoadingSpinner': typeof import("../../components/LoadingSpinner.vue")['default']
  'MobileSidebar': typeof import("../../components/MobileSidebar.vue")['default']
  'Modal': typeof import("../../components/Modal.vue")['default']
  'Overlay': typeof import("../../components/Overlay.vue")['default']
  'ProductCard': typeof import("../../components/ProductCard.vue")['default']
  'ProductCardSkeleton': typeof import("../../components/ProductCardSkeleton.vue")['default']
  'ProductModal': typeof import("../../components/ProductModal.vue")['default']
  'ProfileAddresses': typeof import("../../components/Profile/ProfileAddresses.vue")['default']
  'ProfileBonuses': typeof import("../../components/Profile/ProfileBonuses.vue")['default']
  'ProfileOrders': typeof import("../../components/Profile/ProfileOrders.vue")['default']
  'PromocodeCard': typeof import("../../components/PromocodeCard.vue")['default']
  'SidebarMenu': typeof import("../../components/SidebarMenu.vue")['default']
  'SkeletonLoader': typeof import("../../components/SkeletonLoader.vue")['default']
  'SmsAuth': typeof import("../../components/SmsAuth.vue")['default']
  'ToastContainer': typeof import("../../components/ToastContainer.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyAddressMapPicker': LazyComponent<typeof import("../../components/AddressMapPicker.vue")['default']>
  'LazyAdminLoginModal': LazyComponent<typeof import("../../components/AdminLoginModal.vue")['default']>
  'LazyBannerCarousel': LazyComponent<typeof import("../../components/BannerCarousel.vue")['default']>
  'LazyBottomNavigation': LazyComponent<typeof import("../../components/BottomNavigation.vue")['default']>
  'LazyCartItem': LazyComponent<typeof import("../../components/CartItem.vue")['default']>
  'LazyCartSidebar': LazyComponent<typeof import("../../components/CartSidebar.vue")['default']>
  'LazyCategorySection': LazyComponent<typeof import("../../components/CategorySection.vue")['default']>
  'LazyChatButton': LazyComponent<typeof import("../../components/ChatButton.vue")['default']>
  'LazyCookieBar': LazyComponent<typeof import("../../components/CookieBar.vue")['default']>
  'LazyFloatingCartButton': LazyComponent<typeof import("../../components/FloatingCartButton.vue")['default']>
  'LazyFooterBar': LazyComponent<typeof import("../../components/FooterBar.vue")['default']>
  'LazyHeaderBar': LazyComponent<typeof import("../../components/HeaderBar.vue")['default']>
  'LazyHorizontalCategoryMenu': LazyComponent<typeof import("../../components/HorizontalCategoryMenu.vue")['default']>
  'LazyLoadingSpinner': LazyComponent<typeof import("../../components/LoadingSpinner.vue")['default']>
  'LazyMobileSidebar': LazyComponent<typeof import("../../components/MobileSidebar.vue")['default']>
  'LazyModal': LazyComponent<typeof import("../../components/Modal.vue")['default']>
  'LazyOverlay': LazyComponent<typeof import("../../components/Overlay.vue")['default']>
  'LazyProductCard': LazyComponent<typeof import("../../components/ProductCard.vue")['default']>
  'LazyProductCardSkeleton': LazyComponent<typeof import("../../components/ProductCardSkeleton.vue")['default']>
  'LazyProductModal': LazyComponent<typeof import("../../components/ProductModal.vue")['default']>
  'LazyProfileAddresses': LazyComponent<typeof import("../../components/Profile/ProfileAddresses.vue")['default']>
  'LazyProfileBonuses': LazyComponent<typeof import("../../components/Profile/ProfileBonuses.vue")['default']>
  'LazyProfileOrders': LazyComponent<typeof import("../../components/Profile/ProfileOrders.vue")['default']>
  'LazyPromocodeCard': LazyComponent<typeof import("../../components/PromocodeCard.vue")['default']>
  'LazySidebarMenu': LazyComponent<typeof import("../../components/SidebarMenu.vue")['default']>
  'LazySkeletonLoader': LazyComponent<typeof import("../../components/SkeletonLoader.vue")['default']>
  'LazySmsAuth': LazyComponent<typeof import("../../components/SmsAuth.vue")['default']>
  'LazyToastContainer': LazyComponent<typeof import("../../components/ToastContainer.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
