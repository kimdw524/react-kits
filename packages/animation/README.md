# @kimdw-rtk/animation

## Installation

```bash
# npm
npm install @kimdw-rtk/animation @kimdw-rtk/utils

# pnpm
pnpm add @kimdw-rtk/animation @kimdw-rtk/utils

# yarn
yarn add @kimdw-rtk/animation @kimdw-rtk/utils
```

## Usage

`Animated.*` 컴포넌트는 아래와 같은 공통 props를 가지고 있습니다.
| props | type | default value | description |
| -------- | ------------------------------------------ | ------------- | ---------------------------------------- |
| duration | `number` | **required** | Anmiation 지속 시간 |
| delay | `number` | `0` | Animation 시작까지 지연 시간 |
| initial | `string \| CSSProperties` | **required** | Animation 시작 전에 적용할 스타일/클래스 |
| animate | `string \| CSSProperties` | **required** | Animation 마지막에 적용할 스타일/클래스 |
| easing | `CSSProperties['animationTimingFunction']` | `'ease'` | Animation timing function |

### Text Animation (Animated.Text)

```tsx
import { Animated } from '@kimdw-rtk/animation';

<Animated.Text initial={{ opacity: 0 }} animate={{ opacity: 1 }} duration={500}>
  hello, world!
</Animated.Text>;
```

| props | type                 | default value | description                         |
| ----- | -------------------- | ------------- | ----------------------------------- |
| unit  | `'letter' \| 'word'` | `'letter'`    | Animation을 적용할 단위 (글자/단어) |

### Animated.Box

div를 wrapping 하여 animation을 적용하는 컴포넌트입니다.

```tsx
import { Animated } from '@kimdw-rtk/animation';

<Animated.Box initial={{ opacity: 0 }} animate={{ opacity: 1 }} duration={500}>
  hello, world!
</Animated.Box>;
```

### Animated.Single

하위 요소에 직접 animation을 적용하는 컴포넌트입니다.

```tsx
import { Animated } from '@kimdw-rtk/animation';

<Animated.Single
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  duration={500}
>
  <p>hello, world!</p>
</Animated.Single>;
```

### Animated.Multi

여러 요소에 개별의 animation을 적용할 때 사용하는 컴포넌트입니다.

```tsx
import { Animated } from '@kimdw-rtk/animation';

<Animated.Multi
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  duration={500}
  delayGap={500}
>
  <span>hello,</span>
  <span>world!</span>
</Animated.Multi>;
```

| props       | type     | default value | description              |
| ----------- | -------- | ------------- | ------------------------ |
| durationGap | `number` | `0`           | 요소마다 증가할 duration |
| delayGap    | `number` | `0`           | 요소마다 증가할 delay    |

### TransitionGroup

요소의 mount 뿐만 아니라 unmount 발생 시 Animation을 적용할 수 있습니다.
`key`를 기준으로 요소의 mount/unmount를 판별합니다.

```tsx
import { useState } from 'react';

import { CSSTransition, TransitionGroup } from '@kimdw-rtk/animation';

const [step, setStep] = useState<number>(0);

<TransitionGroup>
  <CSSTransition
    key={step}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    duration={500}
  >
    <button onClick={() => setStep((prev) => prev + 1)}>{step}</button>
  </CSSTransition>
</TransitionGroup>;
```

| props | type                      | default value | description                     |
| ----- | ------------------------- | ------------- | ------------------------------- |
| exit  | `string \| CSSProperties` | **required**  | unmount 시 적용할 스타일/클래스 |
