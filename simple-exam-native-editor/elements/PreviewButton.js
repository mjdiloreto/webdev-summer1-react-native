import React from 'react'
import {Button} from 'react-native-elements'

export const PreviewButton = ({updateForm, preview}) => (
  <Button title="Preview"
          onPress={
            () => updateForm({preview: !preview})
          }
          />
);