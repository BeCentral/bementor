import React from 'react';

const ConversationOverview = (props) => {
  return (
    <section className="inbox-overview">
      {props.children}
    </section>
  )
};

export default ConversationOverview;
