import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

import styles from './DevProxyDemoWebPart.module.scss';
import * as strings from 'DevProxyDemoWebPartStrings';

export interface IDevProxyDemoWebPartProps {
  description: string;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default class DevProxyDemoWebPart extends BaseClientSideWebPart<IDevProxyDemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.devProxyDemo}">
        <section class="${styles.welcome}">
          <h2>Dev Proxy Demo</h2>
          <p>Click the button to fetch data from the API</p>
          <button id="fetchButton">Fetch Post</button>
          <div id="result" style="margin-top: 20px;"></div>
        </section>
      </div>`;

    this.domElement.querySelector('#fetchButton')?.addEventListener('click', () => this._fetchPost());
  }

  private async _fetchPost(): Promise<void> {
    const resultDiv = this.domElement.querySelector('#result');
    if (!resultDiv) return;

    resultDiv.innerHTML = 'Loading...';

    try {
      const response: HttpClientResponse = await this.context.httpClient.get(
        'https://jsonplaceholder.typicode.com/posts/1',
        HttpClient.configurations.v1
      );

      const post: IPost = await response.json();
      const headers = response.headers;

      resultDiv.innerHTML = `
        <div style="padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <small>Post ID: ${post.id}, User ID: ${post.userId}</small>
          <hr style="margin: 15px 0;" />
          <strong>Response Headers:</strong>
          <ul>
            <li>x-powered-by: ${headers.get('x-powered-by') || 'N/A'}</li>
            <li>x-mocked-by: ${headers.get('x-mocked-by') || 'N/A'}</li>
          </ul>
        </div>`;
    } catch (error) {
      resultDiv.innerHTML = `<div style="color: red;">Error: ${(error as Error).message}</div>`;
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
