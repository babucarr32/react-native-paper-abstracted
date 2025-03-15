import * as React from 'react';
import Text from '@/components/Typography/Text'
import Card from '@/components/Card/Card';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/AvatarIcon';

const LeftContent = props => <Avatar {...props} icon="emoticon" />

const CardExample = () => (
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">City of cities</Text>
      <Text variant="bodyMedium">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, saepe. Quos impedit laborum corrupti quisquam reiciendis quidem veritatis in qui earum, beatae iure ipsa cum corporis, ad saepe delectus.
      </Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default CardExample;
