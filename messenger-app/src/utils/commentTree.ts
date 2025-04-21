export interface Comment {
    id: string;
    parent_id: string | null;
    author: {
      name: string;
      picture: string;
    };
    text: string;
    timestamp: number;
    children?: Comment[];
  }
  
  export function buildCommentTree(flatComments: Comment[]): Comment[] {
    const map = new Map<string, Comment>()
    const roots: Comment[] = []
  
    flatComments.forEach(comment => {
      comment.children = []
      map.set(comment.id, comment)
    })
  
    flatComments.forEach(comment => {
      if (comment.parent_id) {
        const parent = map.get(comment.parent_id)
        parent?.children?.push(comment)
      } else {
        roots.push(comment)
      }
    })
  
    return roots
  }