const GROUP_DEFINITIONS = [
  {
    name: 'metadata',
    properties: ['@layer', 'composes', 'vars'],
  },
  {
    name: 'position',
    properties: [
      'position',
      'inset',
      'insetBlock',
      'insetBlockStart',
      'insetBlockEnd',
      'insetInline',
      'insetInlineStart',
      'insetInlineEnd',
      'top',
      'right',
      'bottom',
      'left',
      'zIndex',
    ],
  },
  {
    name: 'layout',
    properties: [
      'display',
      'visibility',
      'boxSizing',
      'overflow',
      'overflowX',
      'overflowY',
      'overflowAnchor',
      'overflowWrap',
      'clip',
      'clear',
      'float',
      'isolation',
      'objectFit',
      'objectPosition',
      'contain',
      'contentVisibility',
    ],
  },
  {
    name: 'flex-grid',
    properties: [
      'flex',
      'flexBasis',
      'flexDirection',
      'flexFlow',
      'flexGrow',
      'flexShrink',
      'flexWrap',
      'justifyContent',
      'justifyItems',
      'justifySelf',
      'alignContent',
      'alignItems',
      'alignSelf',
      'placeContent',
      'placeItems',
      'placeSelf',
      'order',
      'gap',
      'rowGap',
      'columnGap',
      'grid',
      'gridArea',
      'gridTemplate',
      'gridTemplateAreas',
      'gridTemplateColumns',
      'gridTemplateRows',
      'gridAutoColumns',
      'gridAutoFlow',
      'gridAutoRows',
      'gridColumn',
      'gridColumnStart',
      'gridColumnEnd',
      'gridRow',
      'gridRowStart',
      'gridRowEnd',
    ],
  },
  {
    name: 'size',
    properties: [
      'width',
      'minWidth',
      'maxWidth',
      'height',
      'minHeight',
      'maxHeight',
      'aspectRatio',
      'inlineSize',
      'minInlineSize',
      'maxInlineSize',
      'blockSize',
      'minBlockSize',
      'maxBlockSize',
    ],
  },
  {
    name: 'spacing',
    properties: [
      'margin',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
      'marginBlock',
      'marginBlockStart',
      'marginBlockEnd',
      'marginInline',
      'marginInlineStart',
      'marginInlineEnd',
      'padding',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'paddingBlock',
      'paddingBlockStart',
      'paddingBlockEnd',
      'paddingInline',
      'paddingInlineStart',
      'paddingInlineEnd',
    ],
  },
  {
    name: 'border',
    properties: [
      'border',
      'borderTop',
      'borderRight',
      'borderBottom',
      'borderLeft',
      'borderBlock',
      'borderBlockStart',
      'borderBlockEnd',
      'borderInline',
      'borderInlineStart',
      'borderInlineEnd',
      'borderWidth',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderStyle',
      'borderTopStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderLeftStyle',
      'borderColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'borderRadius',
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius',
      'outline',
      'outlineColor',
      'outlineOffset',
      'outlineStyle',
      'outlineWidth',
    ],
  },
  {
    name: 'background',
    properties: [
      'background',
      'backgroundColor',
      'backgroundImage',
      'backgroundPosition',
      'backgroundPositionX',
      'backgroundPositionY',
      'backgroundRepeat',
      'backgroundSize',
      'backgroundAttachment',
      'backgroundClip',
      'backgroundOrigin',
      'backgroundBlendMode',
      'color',
      'fill',
      'stroke',
      'strokeWidth',
      'accentColor',
      'caretColor',
    ],
  },
  {
    name: 'typography',
    properties: [
      'font',
      'fontFamily',
      'fontFeatureSettings',
      'fontKerning',
      'fontOpticalSizing',
      'fontPalette',
      'fontSize',
      'fontSizeAdjust',
      'fontStretch',
      'fontStyle',
      'fontSynthesis',
      'fontVariant',
      'fontWeight',
      'lineHeight',
      'letterSpacing',
      'wordSpacing',
      'wordBreak',
      'overflowWrap',
      'textAlign',
      'textDecoration',
      'textDecorationColor',
      'textDecorationLine',
      'textDecorationStyle',
      'textDecorationThickness',
      'textIndent',
      'textOverflow',
      'textRendering',
      'textShadow',
      'textTransform',
      'whiteSpace',
      'verticalAlign',
      'listStyle',
      'listStyleType',
      'listStylePosition',
      'tabSize',
    ],
  },
  {
    name: 'effects',
    properties: [
      'opacity',
      'boxShadow',
      'filter',
      'backdropFilter',
      'mixBlendMode',
      'mask',
      'maskImage',
      'maskPosition',
      'maskRepeat',
      'maskSize',
      'clipPath',
    ],
  },
  {
    name: 'interaction',
    properties: [
      'appearance',
      'cursor',
      'pointerEvents',
      'resize',
      'scrollBehavior',
      'scrollMargin',
      'scrollMarginTop',
      'scrollMarginRight',
      'scrollMarginBottom',
      'scrollMarginLeft',
      'scrollPadding',
      'scrollPaddingTop',
      'scrollPaddingRight',
      'scrollPaddingBottom',
      'scrollPaddingLeft',
      'scrollSnapAlign',
      'scrollSnapStop',
      'scrollSnapType',
      'touchAction',
      'userSelect',
      'willChange',
    ],
  },
  {
    name: 'animation',
    properties: [
      'transform',
      'transformBox',
      'transformOrigin',
      'transformStyle',
      'translate',
      'rotate',
      'scale',
      'perspective',
      'perspectiveOrigin',
      'transition',
      'transitionDelay',
      'transitionDuration',
      'transitionProperty',
      'transitionTimingFunction',
      'animation',
      'animationComposition',
      'animationDelay',
      'animationDirection',
      'animationDuration',
      'animationFillMode',
      'animationIterationCount',
      'animationName',
      'animationPlayState',
      'animationTimingFunction',
      'transformOrigin',
    ],
  },
];

const GROUP_INDEX_BY_PROPERTY = new Map();

GROUP_DEFINITIONS.forEach((group, index) => {
  group.properties.forEach((property) => {
    GROUP_INDEX_BY_PROPERTY.set(property, index);
  });
});

const OTHER_GROUP_INDEX = GROUP_DEFINITIONS.length;
const NESTED_SELECTOR_GROUP_INDEX = OTHER_GROUP_INDEX + 1;
const CONTAINER_GROUP_INDEX = OTHER_GROUP_INDEX + 2;
const GROUPABLE_CONTAINER_KEYS = new Set([
  '@container',
  '@media',
  '@supports',
  '@starting-style',
  'selectors',
]);

function getCalleeName(callee) {
  if (callee.type === 'Identifier') {
    return callee.name;
  }

  if (callee.type === 'MemberExpression' && !callee.computed) {
    return getCalleeName(callee.property);
  }

  return null;
}

function isNamedLike(calleeName, prefix) {
  return calleeName === prefix || calleeName?.startsWith(prefix);
}

function getPropertyName(property, sourceCode) {
  if (property.type !== 'Property') {
    return null;
  }

  if (property.computed) {
    if (
      property.key.type === 'Literal' &&
      typeof property.key.value !== 'undefined' &&
      property.key.value !== null
    ) {
      return String(property.key.value);
    }

    return null;
  }

  if (property.key.type === 'Identifier') {
    return property.key.name;
  }

  if (
    property.key.type === 'Literal' &&
    typeof property.key.value !== 'undefined' &&
    property.key.value !== null
  ) {
    return String(property.key.value);
  }

  return sourceCode.getText(property.key);
}

function isNestedSelectorKey(key) {
  return (
    key.startsWith(':') ||
    key.startsWith('&') ||
    key.startsWith('[') ||
    key.startsWith('>') ||
    key.startsWith('+') ||
    key.startsWith('~')
  );
}

function isContainerKey(key) {
  return GROUPABLE_CONTAINER_KEYS.has(key);
}

function getGroupIndex(key) {
  if (isNestedSelectorKey(key)) {
    return NESTED_SELECTOR_GROUP_INDEX;
  }

  if (isContainerKey(key)) {
    return CONTAINER_GROUP_INDEX;
  }

  return GROUP_INDEX_BY_PROPERTY.get(key) ?? OTHER_GROUP_INDEX;
}

function getLineIndent(text, rangeStart) {
  const lineStart = text.lastIndexOf('\n', rangeStart - 1) + 1;
  const linePrefix = text.slice(lineStart, rangeStart);
  const indentMatch = linePrefix.match(/^\s*/u);

  return indentMatch ? indentMatch[0] : '';
}

function compareEntries(left, right) {
  if (left.groupIndex !== right.groupIndex) {
    return left.groupIndex - right.groupIndex;
  }

  const nameComparison = left.key.localeCompare(right.key, 'en', {
    sensitivity: 'base',
  });

  if (nameComparison !== 0) {
    return nameComparison;
  }

  return left.index - right.index;
}

function hasAttachedComments(sourceCode, property) {
  return (
    sourceCode.getCommentsBefore(property).length > 0 ||
    sourceCode.getCommentsAfter(property).length > 0
  );
}

function buildFixedText(node, sortedEntries, sourceCode) {
  const originalText = sourceCode.getText(node);

  if (!originalText.includes('\n')) {
    return `{ ${sortedEntries.map((entry) => entry.text).join(', ')} }`;
  }

  const propertyIndent = getLineIndent(
    sourceCode.text,
    sortedEntries[0].node.range[0],
  );
  const closingIndent = getLineIndent(sourceCode.text, node.range[0]);

  let nextText = '{\n';

  sortedEntries.forEach((entry, index) => {
    if (index > 0) {
      const previousEntry = sortedEntries[index - 1];
      nextText += ',\n';

      if (previousEntry.groupIndex !== entry.groupIndex) {
        nextText += '\n';
      }
    }

    nextText += `${propertyIndent}${entry.text}`;
  });

  nextText += `,\n${closingIndent}}`;

  return nextText;
}

function markObjectValues(objectNode, callback) {
  objectNode.properties.forEach((property) => {
    if (
      property.type === 'Property' &&
      property.value.type === 'ObjectExpression'
    ) {
      callback(property.value);
    }
  });
}

export default {
  meta: {
    type: 'layout',
    docs: {
      description:
        'Group and sort CSS properties inside vanilla-extract style objects.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      expectedOrder:
        'Vanilla-extract style properties should be grouped and sorted.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const styleObjects = new WeakSet();

    function markStyleObject(objectNode) {
      if (styleObjects.has(objectNode)) {
        return;
      }

      styleObjects.add(objectNode);

      objectNode.properties.forEach((property) => {
        if (
          property.type !== 'Property' ||
          property.value.type !== 'ObjectExpression'
        ) {
          return;
        }

        const key = getPropertyName(property, sourceCode);

        if (!key) {
          return;
        }

        if (isNestedSelectorKey(key)) {
          markStyleObject(property.value);
          return;
        }

        if (key === 'selectors') {
          markObjectValues(property.value, markStyleObject);
          return;
        }

        if (key === '@media' || key === '@supports' || key === '@container') {
          markObjectValues(property.value, markStyleObject);
        }
      });
    }

    function processRecipeConfig(recipeConfig) {
      recipeConfig.properties.forEach((property) => {
        if (property.type !== 'Property') {
          return;
        }

        const key = getPropertyName(property, sourceCode);

        if (!key) {
          return;
        }

        if (key === 'base' && property.value.type === 'ObjectExpression') {
          markStyleObject(property.value);
          return;
        }

        if (key === 'variants' && property.value.type === 'ObjectExpression') {
          property.value.properties.forEach((variantProperty) => {
            if (
              variantProperty.type !== 'Property' ||
              variantProperty.value.type !== 'ObjectExpression'
            ) {
              return;
            }

            markObjectValues(variantProperty.value, markStyleObject);
          });

          return;
        }

        if (
          key === 'compoundVariants' &&
          property.value.type === 'ArrayExpression'
        ) {
          property.value.elements.forEach((element) => {
            if (!element || element.type !== 'ObjectExpression') {
              return;
            }

            element.properties.forEach((compoundProperty) => {
              if (
                compoundProperty.type === 'Property' &&
                getPropertyName(compoundProperty, sourceCode) === 'style' &&
                compoundProperty.value.type === 'ObjectExpression'
              ) {
                markStyleObject(compoundProperty.value);
              }
            });
          });
        }
      });
    }

    function processStyleVariantsMap(styleVariantsMap) {
      markObjectValues(styleVariantsMap, markStyleObject);
    }

    return {
      CallExpression(node) {
        const calleeName = getCalleeName(node.callee);

        if (
          isNamedLike(calleeName, 'style') &&
          calleeName !== 'styleVariants' &&
          calleeName !== 'globalStyle' &&
          node.arguments[0]?.type === 'ObjectExpression'
        ) {
          markStyleObject(node.arguments[0]);
          return;
        }

        if (
          calleeName === 'globalStyle' &&
          node.arguments[1]?.type === 'ObjectExpression'
        ) {
          markStyleObject(node.arguments[1]);
          return;
        }

        if (
          calleeName === 'keyframes' &&
          node.arguments[0]?.type === 'ObjectExpression'
        ) {
          markObjectValues(node.arguments[0], markStyleObject);
          return;
        }

        if (
          isNamedLike(calleeName, 'recipe') &&
          node.arguments[0]?.type === 'ObjectExpression'
        ) {
          processRecipeConfig(node.arguments[0]);
          return;
        }

        if (calleeName === 'styleVariants') {
          const variantsArgument =
            node.arguments.length === 1 ? node.arguments[0] : node.arguments[1];

          if (variantsArgument?.type === 'ObjectExpression') {
            processStyleVariantsMap(variantsArgument);
          }
        }
      },
      ObjectExpression(node) {
        if (!styleObjects.has(node)) {
          return;
        }

        if (
          node.properties.length < 2 ||
          node.properties.some((property) => property.type !== 'Property')
        ) {
          return;
        }

        const entries = node.properties.map((property, index) => {
          const key = getPropertyName(property, sourceCode);

          return {
            groupIndex: getGroupIndex(key ?? ''),
            index,
            key: key ?? sourceCode.getText(property.key),
            node: property,
            text: sourceCode.getText(property),
          };
        });

        const sortedEntries = [...entries].sort(compareEntries);
        const expectedText = buildFixedText(node, sortedEntries, sourceCode);

        if (sourceCode.getText(node) === expectedText) {
          return;
        }

        const canFix = node.properties.every(
          (property) => !hasAttachedComments(sourceCode, property),
        );

        context.report({
          node,
          messageId: 'expectedOrder',
          fix: canFix ? (fixer) => fixer.replaceText(node, expectedText) : null,
        });
      },
    };
  },
};
