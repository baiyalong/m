import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { renderRoutes } from './routes.jsx';
import { Session } from 'meteor/session';


Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('render-target'));
    Session.set('Info', undefined)
});