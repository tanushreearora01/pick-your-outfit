export interface ClothingItem {
    id: string, 
    imageUrl: string,
    item: ClothingCategory,
    filename: string,
    addedAt: number
}

export interface GeneratedOutfit {
    id: string, 
    top_id: string,
    bottom_id: string,
    shoes_id: string,
    createdAt: number
}

export type ClothingCategory = 'top' | 'bottom' | 'shoes';