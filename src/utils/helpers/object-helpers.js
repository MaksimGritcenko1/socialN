export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}
///почему то не работает
//
// state.users.map(u => {
//     if (u.id === action.userID) {
//         return {...u, followed: true}
//     }
//     return u
// })