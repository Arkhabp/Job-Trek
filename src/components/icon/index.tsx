import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faUserTie,
  faPlus,
  faBriefcase,
  faSearch,
  faFilter,
  faArchive,
  faAngleRight,
  faPenToSquare,
  faTrashCan,
  faXmark,
  faFloppyDisk,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

interface IconsProps {
  name?: string;
  size?: number;
  color?: string;
}

const Icons: React.FC<IconsProps> = ({name, size = 24, color = 'black'}) => {
  let icon: IconDefinition | undefined;
  switch (name) {
    case 'Home':
      icon = faHome;
      break;
    case 'Profile':
      icon = faUserTie;
      break;
    case 'Plus':
      icon = faBriefcase;
      break;
    case 'linkedin':
      icon = faLinkedin;
      break;
    case 'Search':
      icon = faSearch;
      break;
    case 'Filter':
      icon = faFilter;
      break;
    case 'Archive':
      icon = faArchive;
      break;
    case 'AngleRight':
      icon = faAngleRight;
      break;
    case 'Edit':
      icon = faPenToSquare;
      break;
    case 'Delete':
      icon = faTrashCan;
      break;
    case 'Cancel':
      icon = faXmark;
      break;
    case 'Save':
      icon = faFloppyDisk;
      break;
    case 'ArrowLeft':
      icon = faArrowLeft;
      break;
    default:
      break;
  }

  if (!icon) return null;

  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
};

export default Icons;
