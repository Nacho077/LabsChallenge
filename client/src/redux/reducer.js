import actionCreator from './actionCreator.js'
const { ITEMS, SETITEMS, KEY, PAGE, CATEGORIES, PRODUCT, CATEGORY, USER, THISCAT } = actionCreator

const initialState = {
    cache: {},
    items: [],
    key: '',
    page: 1,
    categories: [],
    products: {},
    cacheProducts: {},
    category: {},
    cacheCats: {},
    user: {},
    this_cat: ""
}

export default (state = initialState, action) => {
    switch(action.type){
        case ITEMS:
            if(state.cache[action.payload.name]){
                return{
                    ...state,
                    items: state.items.concat(action.payload.products)
                }
            }
            return{
                ...state,
                cache: {
                    ...state.cache,
                    [action.payload.name]: {
                        totalProducts: action.payload.total_products,
                        products: action.payload.products
                    }
                },
                items: action.payload.products
            }
        case SETITEMS:
            return{
                ...state,
                items: action.payload
            }
        case KEY:
            return{
                ...state,
                key: action.payload
            }
        case PAGE:
            return{
                ...state,
                page: action.payload
            }
        case CATEGORIES:
            return{
                ...state,
                categories: action.payload
            }
        case PRODUCT:
            return{
                ...state,
                cacheProducts: {
                    ...state.cacheProducts,
                    [action.payload.product_id]: {
                        product: action.payload
                    }
                },
                products: action.payload
            }
        case CATEGORY:
            if(state.cacheCats[action.payload.name]){
                return{
                ...state,
                category: state.category.concat(action.payload.products)
                }
            }
            return{
                ...state,
                cacheCats: {
                    ...state.cacheCats,
                    [action.payload.name]: {
                        totalProducts: action.payload.total_products,
                        products: action.payload.products,
                        attributes: action.payload.attributes
                    }
                },
                category: action.payload.products
            }
        case USER:
            return{
                ...state,
                user: action.payload
            }
        case THISCAT:
            return{
                ...state,
                this_cat: action.payload
            }
        default:
            return{
                ...state
            }
    }
}