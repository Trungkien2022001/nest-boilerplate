import { SetMetadata } from '@nestjs/common';
import { EUserType } from 'src/enums';

import { SPEC_KEY } from '../../constants';

export const Auth = (specs: EUserType[], isOnly = false) => SetMetadata(SPEC_KEY, { specs, isOnly });
