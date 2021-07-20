---
sidebar_position: 1
---

# Flaging Component

In this section we will learn how to create feature flags for React Component and how to apply a good pattern.

for example our project is structured like this

```
--src/
----components/
------PageHeader.tsx
------BuyButton.tsx
------Modal.tsx
----pages/
------index.tsx
------blog.tsx
```

and we want to create feature flag for component `/src/components/PageHeader.tsx`

```tsx title="src/components/PageHeader.tsx"
import React from 'react';
import { Stack, Heading, Text } from '@chakra/react';

const PageHeader = () => {
  return (
    <Stack>
      <Heading>Welcome to our website</Heading>
      <Text>Description 1</Text>
    </Stack>
  );
};

export default PageHeader;
```

the new version of `PageHeader` is replacing `<Text>` node with

```tsx
<Stack>
  <Text>Description 1</Text>
  <Text>Description 2</Text>
</Stack>
```

the simples way to do this is by using `branching statement`

```tsx
import { createToggleFn } from '@warungpintar/morphling-core';

const isFlagEnabled = createToggleFn('page-header-v2')(() => false)(() => true);

const PageHeader = () => {
  return (
    <Stack>
      <Heading>Welcome to our website</Heading>
      {isFlagEnabled() ? (
        <Stack>
          <Text>Description 1</Text>
          <Text>Description 2</Text>
        </Stack>
      ) : (
        <Text>Description 1</Text>
      )}
    </Stack>
  );
};
```

but that's not the recomended way to do it, we will explain it later.

Instead, we should use the `HOC` and separate the logic per file. so in this case we will create new component file in `/src/experiments/components/PageHeader.tsx`

```tsx title="/src/experiments/components/PageHeader.tsx"
import React from 'react';
import { Stack, Heading, Text } from '@chakra/react';

const PageHeader = () => {
  return (
    <Stack>
      <Heading>Welcome to our website</Heading>
      <Stack>
        <Text>Description 1</Text>
        <Text>Description 2</Text>
      </Stack>
    </Stack>
  );
};

export default PageHeader;
```

then we modify the original component by wrapping it with `HOC`

```tsx title="src/components/PageHeader.tsx"
import { withFeatureToggle } from '@warungpintar/morphling-react';
import PageHeaderV2 from '../experiments/components/PageHeader';

// the rest of the code

export default withFeatureToggle('page-header-v2')(PageHeader)(PageHeaderV2);
```

## Why we should avoid branching statement?

Feature Flags / AB Testing is technique for testing out different version of code that can be switched at runtime, or another use case is testing out new feature in production. for example we have music player app and we want to test our new sound animation component.

The sound animation feature is critical because 90% of users are happy about it, so if we want to replace / upgrade the current animation we should really careful about it! because the new component shouldn't break at runtime or atleast if the new component breaks we can switch back to the old component instantly without any problem.

Common way to achieve this objective is make sure the old component is untouch, so we sure that it's functionality doesn't change. and we can't achieve this by using `branching statement` because we need to touch the logic to create the `branch statement`

That's why it's really important to use `HOC` for `React Component`, and isolate the component per file!

### Graduation

Graduation is term for releasing flaged component and cleaning up the old component, this process is important to do to keep our codebase clean and the bundle size small. the `common` problem using `branching statement` is hard and high risk.

1. we need to touch the logic to remove the branching statement
2. hard to tell how many flagged component are still in our codebase
3. sometimes if we fucked up, the error not catched at build process.

The benefit of using hoc and isolate into difference files is:

1. we dont have to touch the logic, just need to change the export statement
2. it's easy to tell how many experiments are in our codebase, just count how many files in `experiments` folder
3. delete some files in experiments folder -> build -> the error will be catched
