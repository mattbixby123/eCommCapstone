const initialState = {
    searchQuery: '',
   };
   
   const searchReducer = (state = initialState, action) => {
    switch (action.type) {
       case 'UPDATE_SEARCH_QUERY':
         return { ...state, searchQuery: action.payload };
       default:
         return state;
    }
   };
   
   export default searchReducer;
   