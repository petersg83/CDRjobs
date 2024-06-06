import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
 
export const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './types')))
export const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))