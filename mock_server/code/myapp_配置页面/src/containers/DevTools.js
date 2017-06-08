/* eslint import/no-extraneous-dependencies: [2, { devDependencies: true }] */
import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor
    defaultIsVisible
    toggleVisibilityKey='ctrl-k'
    changePositionKey='ctrl-n'
  >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)
