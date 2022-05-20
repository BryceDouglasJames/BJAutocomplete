export class TrieNode{
    val?: string;
    isEnd: boolean;
    children: Map<string, TrieNode>
    constructor(str?: string){
        this.val = str;
        this.isEnd = false;
        this.children = new Map<string, TrieNode>();
    }

    isEndNode(): boolean{
        return this.isEnd
    };

    numOfChildren(): number{
        return this.children.size;
    };

    hasChild(char: string): boolean{
        return this.children.has(char);
    }

    getChild(char: string): TrieNode{
        if (this.hasChild(char)) {
            return this.children.get(char);
        }
        throw new Error(`No child exists for: ${char}`);
    }

    addChild(char: string, child: TrieNode): void{
        if(!this.hasChild(char)){
            this.children.set(char, child);
        }else{
            throw new Error(`Error adding child: ${char}`);
        }
    }
}

