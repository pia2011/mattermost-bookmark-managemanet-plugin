import React from 'react';
import { FormattedMessage } from 'react-intl';
import en from 'i18n/en.json';
import es from 'i18n/es.json';
import { id as pluginId } from './manifest';
import RHSView from './components/right_hand_sidebar';
import {
    ChannelHeaderButtonIcon,
} from './components/icons';


function getTranslations(locale) {
    switch (locale) {
        case 'en':
            return en;
        case 'es':
            return es;
    }
    return {};
}

export default class DemoPlugin {
    initialize(registry, store) {
        const { toggleRHSPlugin } = registry.registerRightHandSidebarComponent(
            RHSView,
            <FormattedMessage
                id='Category'
                defaultMessage='Category'
            />);

        registry.registerChannelHeaderButtonAction(
            <ChannelHeaderButtonIcon />,
            () => store.dispatch(toggleRHSPlugin),
            <FormattedMessage
                id='Category'
                defaultMessage='Category'
            />,
        );
    }

    uninitialize() {
        //eslint-disable-next-line no-console
        console.log(pluginId + '::uninitialize()');
    }
}
