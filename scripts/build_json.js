#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const http = require('http');

// location depends on whether or not you're in a docker container
const apiLocation = "localhost";
const apiPort = 8080;
//const apiLocation = "host.docker.internal";
const basePath = "/api";

// Use process.cwd() to ensure we're writing to the project directory
const dataPath = path.join(process.cwd(), 'data');

// Helper function to make HTTP requests
function makeRequest(endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: apiLocation,
            port: apiPort,
            path: `${basePath}${endpoint}`,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Helper function to fetch and save JSON
async function fetchAndSaveJson(endpoint, filename) {
    try {
        const data = await makeRequest(endpoint);
        const filePath = path.join(dataPath, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        await fs.chmod(filePath, 0o666); // Make file readable/writable by everyone
        console.log(`Successfully saved ${filename}`);
    } catch (error) {
        console.error(`Error processing ${filename}:`, error);
    }
}

async function main() {
    try {
        // Create data directory if it doesn't exist
        await fs.mkdir(dataPath, { recursive: true });

        // Set directory permissions to 777 (readable/writable/executable by everyone)
        await fs.chmod(dataPath, 0o777);
        console.log(`Created/verified data directory at: ${dataPath} with full permissions`);

        // Array of endpoints and their corresponding filenames
        const endpoints = [
            {
                endpoint: '/central-programs',
                filename: 'central-programs.json'
            },
            {
                endpoint: '/central-programs/resources',
                filename: 'central-programs-resources.json'
            },
            {
                endpoint: '/sankey',
                filename: 'sankey.json'
            },
            {
                endpoint: '/sankey?groupBy=restricted',
                filename: 'sankey-restricted.json'
            },
            {
                endpoint: '/central-programs/sankey',
                filename: 'central-programs-sankey.json'
            },
            {
                endpoint: '/central-programs/sankey?groupBy=restricted',
                filename: 'central-programs-sankey-restricted.json'
            },
            {
                endpoint: '/central-programs/overview',
                filename: 'central-programs-overview.json'
            }
        ];

        // Process all endpoints concurrently
        await Promise.all(
            endpoints.map(({ endpoint, filename }) => 
                fetchAndSaveJson(endpoint, filename)
            )
        );

        console.log('All files have been processed successfully');
    } catch (error) {
        console.error('Error running the script:', error);
        process.exit(1);
    }
}

main();