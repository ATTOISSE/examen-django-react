export const initialState = {
    loans : []
}

export const loanReducer = (state,action)=>{
    switch (action.type) {
        case 'ADD_LOAN':
            return {
                ...state,
                loans:[...state.loans,action.payload]
            }
        case 'REMOVE_LOAN':
            return {
                ...state,
                loans:state.loans
                .results.filter(
                    b=>b.id != action.payload
                )
            }
        case 'UPDATE_LOAN':
            return{
                ...state,
                loans:state.loans
                .results.find(
                    loan => loan.id === action.payload.id ?
                        {...loan,...action.payload.updates} :
                        loan
                )
                
            }
        case 'SET_LOANS':
            return{
                ...state,
                loans:action.payload
            }
        default:
            return state
    }
}