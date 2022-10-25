const Option = ({list}) => {
    return ( 
        <option value={list.id}>{list.title}</option> 
     );
}
 
export default Option;