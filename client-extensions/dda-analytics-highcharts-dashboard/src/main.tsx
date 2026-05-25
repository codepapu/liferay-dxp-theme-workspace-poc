import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { App } from '@/app/App';
import { DashboardConfigProvider } from '@/context/DashboardConfigProvider';
import { buildRuntimeConfig } from '@/services/configService';

import '@/styles/global.css';

const ELEMENT_ID = 'dda-analytics-highcharts-dashboard';

class DdaAnalyticsDashboardElement extends HTMLElement {
  private root: Root | null = null;

  connectedCallback() {
    const config = buildRuntimeConfig(this);
    if (!this.root) {
      this.root = createRoot(this);
    }
    this.root.render(
      <StrictMode>
        <DashboardConfigProvider value={config}>
          <App />
        </DashboardConfigProvider>
      </StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }
}

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, DdaAnalyticsDashboardElement);
}

export {};
