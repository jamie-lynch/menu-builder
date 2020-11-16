import { FindConditions, Like, ObjectLiteral } from "typeorm"

export function getOrderObject(orderParam: {[key: string]: any}, sortableKeys: string[], _default: {[key: string]: "ASC" | "DESC" | 1 | -1} = {id: "ASC"}): {[key: string]: "ASC" | "DESC" | 1 | -1} {
    if (!orderParam) {
        return _default
    }

    const order: {[key: string]: "ASC" | "DESC" | 1 | -1} = {}
    Object.keys(orderParam).forEach(key => {
        if (sortableKeys.includes(key) && ["ASC", "DESC", -1, 1].includes(orderParam[key])) {
            order[key] = orderParam[key]
        }
    })

    if (!Object.keys(order).length) {
        return _default
    }

    return order
}

export enum whereTypes {
    EQUALS = "EQUALS",
    LIKE = "LIKE"
}

export type WhereOptions<Entity> = FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string

export function getWhereObject<Entity>(searchParam: {[key: string]: any}, filterObject: {[key: string]: whereTypes}):WhereOptions<Entity> {
    if (!searchParam) return

    const where: {[key: string]: any} = {}

    Object.keys(searchParam).forEach(key => {
        const type = filterObject[key]
        if (type) {
            switch (type) {
                case whereTypes.EQUALS:
                    where[key] = searchParam[key]
                    break
                case whereTypes.LIKE:
                    where[key] = Like(`%${searchParam[key]}%`)
                    break
            }
        }
    })

    return where
}