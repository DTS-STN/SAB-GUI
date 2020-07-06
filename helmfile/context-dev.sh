#!/bin/bash
echo "Logging in to Dev K8 Cluster.."
az aks get-credentials --resource-group EsDCDTSDevRG --name EsDCDTSDevRG-K8S
echo "Done."

# Since we didn't get these from the createSPN script, we have to fetch them now.
if [ -z "$DOCKER_TAG" ]
then
    export DOCKER_TAG=latest
fi
export BASE_DOMAIN=dts-stn.dev
export GITHUB_USER=$(az keyvault secret show --vault-name DTSSecrets --name dts-github-user --query value -otsv)
export GITHUB_TOKEN=$(az keyvault secret show --vault-name DTSSecrets --name dts-github-token --query value -otsv)
export SAB_NOTIFICATION_API_KEY=$(az keyvault secret show --vault-name DTSSecrets --name dts-dev-sab-api-notification-key --query value -otsv)
export REACT_APP_APPLICATION_ID=$(az keyvault secret show --vault-name DTSSecrets --name dts-dev-sab-react-app-id --query value -otsv)
export SAB_DB_PASS=$(az keyvault secret show --vault-name DTSSecrets --name dts-sab-db-pass-dev --query value -otsv)
export SAB_DB_ROOT_PASS=$(az keyvault secret show --vault-name DTSSecrets --name dts-sab-db-root-pass-dev --query value -otsv)