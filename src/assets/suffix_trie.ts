import { TrieNode } from "./trie_node";
export class SuffixTrie{ 
    strings?: string[];
    current_root: string
    size: number;
    root: TrieNode;
    constructor(strs?: string[]){
        this.strings = strs;
        this.current_root = "";
        this.root = new TrieNode(this.current_root);
        this.size = 0;
        if (Array.isArray(this.strings) && this.strings.length > 0) {
            for (let i = 0; i < this.strings.length; i += 1) {
                //console.log(`Inserting ${this.strings[i]} into the tree`);
                this.insert(this.strings[i]);
            }
        }
    }

    create_suggestions(prefix: string):   string[] {
        const completions: string[] = [];
        const [node, depth] = this.findNode(prefix);
        if (depth === 0) {
            return completions;
        }
        this.dfs(node, prefix, completions);
        return completions;
    }

    insert(str: string): void{
        let node = this.root;
        for (let i = 0; i < str.length; i += 1) {
            if (node.hasChild(str[i])) {
                node = node.getChild(str[i]);
            } else {
                node.addChild(str[i], new TrieNode(str[i]));
                node = node.getChild(str[i]); 
            }
        }
        if (!node.isEndNode()) {
            this.size += 1;
            node.isEnd = true; 
        }
    }

    contains(str: string): boolean {
        let node = this.root;
        for (let i = 0; i < str.length; i++) {
            if (node.hasChild(str[i])) {
                node = node.getChild(str[i]);
            } else {
                return false;
            }
        }
        return node.isEnd;
    }

    dfs(node: TrieNode, prefix: string, FullWords: string[]): void{
        if(node.isEndNode()){
            FullWords.push(prefix);
        }

        for (const char of node.children.keys()) {
            const next_node = node.getChild(char);
            this.dfs(next_node, prefix + char, FullWords);
        }
    }

    findNode(str: string): [TrieNode, number] {
        if (str.length === 0) {
            return [this.root, 0];
        }
        let [node, depth] = [this.root, 0];
        for (let i = 0; i < str.length; i++) {
            if (node.hasChild(str[i])) {
                node = node.getChild(str[i]);
                depth += 1;
            } else {
                return [node, 0];
            }
        }
        return [node, depth];
    }

    allTreeStrings(): string[] {
        const all_strings: string[] = [];
        this.dfs(this.root, '', all_strings);
        return all_strings;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}