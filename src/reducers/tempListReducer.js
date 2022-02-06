import { ADD_TEMP_ITEM, CLEAR_ALL, DELETE_TEMP_ITEM, MODIFY_TEMP_ITEM } from "../actions/tempListAction";


export const tempListReducer = (state=[],action) => {
    switch (action.type) {
        case ADD_TEMP_ITEM:
            if(state.length>0){
                let wecan = true;
                let previousName = []
                state.forEach(itm=>{
                    if(itm.name===action.payload.item.name){
                        //console("c'est le meme nom")
                        wecan = false;
                    }
                    previousName.forEach(pnm=>{
                        if(pnm===action.payload.item.name){
                            //console("c'est le meme nom")
                            wecan = false;
                        }
                    })
                    previousName.push(itm.name)
                })
                if(wecan){
                    return [...state,action.payload.item]
                }else{
                    return state;
                }
            }else{
                return [...state,action.payload.item]
            }
        case MODIFY_TEMP_ITEM:
            return state.map(el=>{
                if(el._id===action.payload._id){
                    //console("corelation tkt meme pas")
                    if(action.payload.type==="more"){
                        //console("l'un des deux")
                        return {categories:el.categories,date:el.date,image:el.image,isChecked:el.isChecked,name:el.name,note:el.note,numberOfElements:el.numberOfElements+1,_id:el._id}
                    }else if(action.payload.type==="less"){
                        if(el.numberOfElements>1){
                            return {categories:el.categories,date:el.date,image:el.image,isChecked:el.isChecked,name:el.name,note:el.note,numberOfElements:el.numberOfElements-1,_id:el._id}
                        }
                    }
                }else{
                    return el;
                }
            });
        case DELETE_TEMP_ITEM:
            console.log("temp is:")
            console.log(action.payload)
            return state.filter(element=>element.specialId!==action.payload.specialId);
        case CLEAR_ALL:
            return state.filter(el=>el._id==="fucjnecjecnaicjnazujincianldczcnajklcn");
        default:
            return state;
    }
}