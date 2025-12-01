export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  image: string | null
  description: string | null
  sortOrder: number
  isActive: boolean
  _count?: {
    products: number
  }
}

export interface ProductModifierOption {
  id: string
  name: string
  price: number
  isDefault: boolean
}

export interface ProductModifier {
  id: string
  name: string
  price: number
  isRequired: boolean
  isMultiple: boolean
  options: ProductModifierOption[]
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  images: string[]
  price: number
  oldPrice: number | null
  weight: number | null
  calories: number | null
  isActive: boolean
  isPopular: boolean
  category: {
    id: string
    name: string
    slug: string
    icon: string | null
  }
  modifiers: ProductModifier[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  limit?: number
  offset?: number
}

export const useCatalog = () => {
  const categories = useState<Category[]>('catalog:categories', () => [])
  const products = useState<Product[]>('catalog:products', () => [])
  const totalProducts = useState<number>('catalog:total', () => 0)
  const loading = useState<boolean>('catalog:loading', () => false)

  const fetchCategories = async () => {
    try {
      const data = await $fetch<Category[]>('/api/categories')
      categories.value = data
      return data
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error)
      throw error
    }
  }

  const fetchProducts = async (params?: {
    categoryId?: string
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    isPopular?: boolean
    limit?: number
    offset?: number
  }) => {
    loading.value = true
    try {
      const query: Record<string, string> = {}
      if (params?.categoryId) query.categoryId = params.categoryId
      if (params?.search) query.search = params.search
      if (params?.sortBy) query.sortBy = params.sortBy
      if (params?.sortOrder) query.sortOrder = params.sortOrder
      if (params?.isPopular) query.isPopular = 'true'
      if (params?.limit) query.limit = params.limit.toString()
      if (params?.offset) query.offset = params.offset.toString()

      const data = await $fetch<ProductsResponse>('/api/products', { query })
      products.value = data.products
      totalProducts.value = data.total
      return data
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    try {
      const product = await $fetch<Product>(`/api/products/${id}`)
      return product
    } catch (error) {
      console.error('Ошибка при загрузке товара:', error)
      throw error
    }
  }

  return {
    categories: readonly(categories),
    products: readonly(products),
    totalProducts: readonly(totalProducts),
    loading: readonly(loading),
    fetchCategories,
    fetchProducts,
    fetchProduct
  }
}

