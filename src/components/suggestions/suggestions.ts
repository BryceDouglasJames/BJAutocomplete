import { useEffect, useState } from 'react';
import { SuffixTrie } from '../../assets/suffix_trie';

// State properties in this component
interface AutoComplete {
    searchTree: SuffixTrie;
}

export function Suggestions(searchTerm: string, dict: string[] = []): [string[][], number] {
    let start = performance.now();
    const [search, setSearch] = useState<AutoComplete>({
        searchTree: new SuffixTrie()
        //TODO Render graph representation of the trie
    });

    const {searchTree} = search;

    useEffect(()=>{
        setSearch({
            searchTree: new SuffixTrie(dict)
        });
    },[])

    //if there is a search, check to see if word is found
    if (searchTerm.length > 0) {       
        return [[searchTree.create_suggestions(searchTerm)], performance.now() - start ];
    }else{
        return [[], -1];
    }
}