import {
  hasAllOf,
  hasAnyOf,
  hasItems,
  hasProperties,
  hasTypeRef,
  PydanticTypeDefinition,
  PydanticTypeProperty,
  PydanticPropertiesMap,
  PydanticTypeRef,
  RefStringRegExp
} from '@/types/Pydantic'


export const getTypeDefinitionFromTypeRef = (ref: PydanticTypeRef<string>, definition: PydanticTypeDefinition): PydanticTypeDefinition | undefined => {
  const extractedType = ref.match(RefStringRegExp)?.[1]

  if (!extractedType) {
    return
  }

  const resolvedDefinition = definition.definitions?.[extractedType]

  return resolvedDefinition
}

export const getResolvedTypeDefinitionFromProperty = (property: PydanticTypeProperty, schema: PydanticTypeDefinition): PydanticTypeProperty => {
  let definition: PydanticTypeProperty = {}

  if (hasTypeRef(property)) {
    const _definition = getTypeDefinitionFromTypeRef(property.$ref, schema)
    definition = { ..._definition }
  }

  if (hasAllOf(property)) {
    definition.allOf = property.allOf.map((_property) => getResolvedTypeDefinitionFromProperty(_property, schema))
  }

  if (hasAnyOf(property)) {
    definition.anyOf = property.anyOf.map((_property) => getResolvedTypeDefinitionFromProperty(_property, schema))
  }

  if (hasItems(property)) {
    if (Array.isArray(property.items)) {
      definition.items = property.items.map((_property) => getResolvedTypeDefinitionFromProperty(_property, schema))
    } else {
      definition.items = getResolvedTypeDefinitionFromProperty(property.items, schema)
    }
  }

  if (hasProperties(definition)) {
    Object.entries(definition.properties).forEach(([key, property]) => {
      definition.properties![key] = getResolvedTypeDefinitionFromProperty(property, schema)
    })
  }

  definition = { ...property, ...definition }

  return definition
}

export class PydanticSchema {
  private readonly rawSchema: PydanticTypeDefinition
  private readonly _properties: PydanticPropertiesMap

  public constructor(schema: PydanticTypeDefinition) {
    this.rawSchema = schema
    this._properties = this.definePropertyDefinitions(schema.properties)
  }

  public get properties(): Record<string, PydanticTypeProperty> {
    return this._properties
  }

  public get definitions(): Record<string, PydanticTypeDefinition> {
    return this.rawSchema.definitions ?? {}
  }

  private definePropertyDefinitions(properties: PydanticPropertiesMap = {}): PydanticPropertiesMap {
    const definedProperties = { ...properties }

    Object.entries(properties).forEach(([key, property]) => {
      const definition = getResolvedTypeDefinitionFromProperty(property, this.rawSchema)
      definedProperties[key] = definition
    })

    return definedProperties
  }
}
