export const initialState = {
    users:[]
}

export const userReducer = (state,action)=>{
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                users:[state.users,
                action.payload]
            }
        case 'REMOVE_USER':
            return{
                ...state,
                users:state.users.results.filter(
                    user => user.id != action.payload
                )
            }
        case 'SET_USERS':
            return{
                ...state,
                users:action.payload
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users:state.users.results
                .find(
                    user => user.id === action.payload.id ?
                    {...user,...action.payload.updates} :
                    user
                )
            }
    
        default:
            return state;
    }
}