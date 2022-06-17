//&_______________________ Title Function _______________________&//

export const TabTitle = ((newTitel) => {
    return (document.title = newTitel)
})

//&_______________________ SORT PRIMARY _______________________&//

export const SortPrimary = ((defaultAccount) => {
    return defaultAccount.sort((a)=> a.primary ? -1 : 1 )
})
