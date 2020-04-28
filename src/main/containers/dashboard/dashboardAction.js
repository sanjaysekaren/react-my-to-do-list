import moment from 'moment';

export const getAllItems = ()=>{
    return{ 
        type:'FETCHLISTITEMS',
        payload:[]
    }    
}

export const AddNewListToState = (newList)=>{
    return{ 
        type:'ADDNEWITEMTOSTATE',
        payload:newList
    } 

}

export const AddExpiredToState = (newList)=>{
    return{ 
        type:'ADDEXPIREDTOSTATE',
        payload:newList
    } 
}

export const AddNewList = (listName,noOfItems)=>{
    return async(dispatch,getState)=>{
        // console.log(listName,noOfItems,getState().dashboardReducers.mainListData)
        let mainStateList = getState().dashboardReducers.mainListData
        let id = (noOfItems*1) + 1;
        let today = new Date();
        let [date,time]=  [moment(today).format('YYYY-MM-DD'),moment(today).format('hh:mm')]
        let newList = {
            listId:id,
            listName:listName,
            createdDate:date,
            createdTime:time,
            items:[]
        }
        mainStateList.push(newList)
        dispatch(AddNewListToState(mainStateList))
    }

}

export const AddNewItem = (id,name,date,time)=>{
    return async(dispatch,getState)=>{
        let mainStateList = getState().dashboardReducers.mainListData
        let exisitingList = getState().dashboardReducers.mainListData.filter((list)=>list.listId === id)
        let itemNextId=1
        if(exisitingList[0].items.length>0){
            const ids = exisitingList[0].items.map((item) => item.itemId)
            itemNextId = Math.max.apply(Math, ids)*1+1;
        }
        let newItem ={
            itemId:itemNextId,
            itemName:name,
            createdDate:date,
            createdTime:time
        }
        mainStateList.find(list => list.listId===id).items.push(newItem)
        dispatch(AddNewListToState(mainStateList))
    }
}

export const UpdateItem = (listId,itemId,name,date,time)=>{
    return async(dispatch,getState)=>{
        let mainStateList = getState().dashboardReducers.mainListData
        mainStateList.find(list => list.listId === listId).items.find(item=> item.itemId===itemId).itemName = name
        mainStateList.find(list => list.listId === listId).items.find(item=> item.itemId===itemId).createdDate = date
        mainStateList.find(list => list.listId === listId).items.find(item=> item.itemId===itemId).createdTime = time
        dispatch(AddNewListToState(mainStateList))
    }
}

export const deleteCompleteList = (listId)=>{
    return async(dispatch,getState)=>{
        let mainStateList = getState().dashboardReducers.mainListData
        let deletedList = getState().dashboardReducers.expiredData
        let updatedMainStateList = mainStateList.filter(list => list.listId!==listId)
        deletedList.push(mainStateList.filter(list => list.listId===listId))
        console.log(deletedList)
        dispatch(AddNewListToState(updatedMainStateList))
        dispatch(AddExpiredToState(deletedList))
    }
}

export const deleteItemsInList = (listId,itemIdList)=>{
    return async(dispatch,getState)=>{
        let mainStateList = getState().dashboardReducers.mainListData
        mainStateList.find(list => list.listId===listId).items = mainStateList.find(list => list.listId===listId).items.filter(item=> itemIdList.indexOf(item.itemId)===-1)
        console.log(mainStateList,itemIdList)
        dispatch(AddNewListToState(mainStateList))
    }
}