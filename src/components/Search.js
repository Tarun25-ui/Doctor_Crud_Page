import { FormControl, InputGroup } from "react-bootstrap"


const Search = ({query, onQueryChange}) => {
    return(
        <>
            <InputGroup className="mb-3">
                <FormControl placeholder="Search" onChange={(event)=> {
                    onQueryChange(event.target.value)
                }} value={query} />
            </InputGroup>

        </>
    )
}

export default Search;