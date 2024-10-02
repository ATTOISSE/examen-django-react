export const initialState = {
    books : []
}

export const bookReducer = (state,action)=>{
    switch (action.type) {
        case 'ADD_BOOK':
            return {
                ...state,
                books:[...state.books,action.payload]
            }
        case 'REMOVE_BOOK':
            return {
                ...state,
                books:state.books
                .results.filter(
                    b=>b.id != action.payload
                )
            }
        case 'UPDATE_BOOK':
            return{
                ...state,
                books:state.books
                .results.find(
                    book => book.id === action.payload.id ?
                        {...book,...action.payload.updates} :
                        book
                )
                
            }
        case 'SET_BOOKS':
            return{
                ...state,
                books:action.payload
            }
        default:
            return state
    }
}