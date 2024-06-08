import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import DocumentCard from './document-card';

// ----------------------------------------------------------------------

export default function DocumentCardList({ users }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {users.map((user) => (
        <DocumentCard key={user.id} user={user} />
      ))}
    </Box>
  );
}

DocumentCardList.propTypes = {
  users: PropTypes.array,
};
