import {FC, memo} from 'react';

import Icon, {IconProps} from './Icon';

const CodePenIcon: FC<IconProps> = memo(props => (
  <Icon {...props}>
    <path d="M64 24L22 52v24l42 28 42-28V52L64 24zm0 9.6L94 53.6 64 73.2 34 53.6 64 33.6zM30.8 60.4 55.6 76 30.8 91.6V60.4zm66.4 0v31.2L72.4 76l24.8-15.6zM38.8 98.4 64 82.8l25.2 15.6L64 115.2 38.8 98.4z" />
  </Icon>
));

export default CodePenIcon;