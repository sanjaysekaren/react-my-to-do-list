const initial_state = {
    mainListData:[],expiredData:[]
}

export const dashboardReducer = (state=initial_state,action)=>{
    switch (action.type){
        case 'FETCHLISTITEMS':
            return {
                ...state,mainListData:action.payload
            }
        case 'ADDNEWITEMTOSTATE':
            return {
                ...state,mainListData:action.payload
            }
        case 'ADDEXPIREDTOSTATE':
            console.log('in reducer'+action.payload)
            return{
                ...state,expiredData:action.payload
            }
        default:
            return{...state,mainListData:[],expiredData:[]}
    }
}