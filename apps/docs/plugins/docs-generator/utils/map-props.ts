import { ComponentDoc } from 'react-docgen-typescript';

import { DocsMeta } from '../types';

/**
 * 문서의 props 설명을 생성하는 함수
 * required가 아닌 필드는 description이 작성된 경우에만 추가한다.
 *  */
export const mapProps = (
  object: Record<string, unknown>,
  component: ComponentDoc,
) => {
  const docsProps: DocsMeta['props'] = [];

  for (const prop in component.props) {
    if (!Object.hasOwn(object, prop) && !component.props[prop].required) {
      continue;
    }

    docsProps.push({
      name: prop,
      isRequired: component.props[prop].required,
      type: component.props[prop].type.name,
      typeRaw: component.props[prop].type.raw,
      description:
        object[prop] === undefined ? undefined : String(object[prop]),
    });
  }

  return docsProps;
};
