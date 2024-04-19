import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ERoles } from 'src/enums';

import { ROLES_KEY} from '../../constants';

export const Roles = (roles: ERoles[]): CustomDecorator => SetMetadata(ROLES_KEY, roles);
