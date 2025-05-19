# Beskrivning av API:er

Strukturen för API:ets olika endpoints och routing är nu färdiga i sin grundform.

## Default :

- localhost:5001/
  //---------------------------------------------------

## User route :

- http://localhost:5001/users/
  //---------------------------------------------------
  User routes :
- http://localhost:5001/users/tips
- http://localhost:5001/users/risks
- http://localhost:5001/users/notifications
- http://localhost:5001/users/safety
  //---------------------------------------------------

## Admin route :

- localhost:5001/admins/
- localhost:5001/admins/
  //---------------------------------------------------

### Monitoring routes :

- ://localhost:5001/admins/authenticated/monitoring/
- http://localhost:5001/admins/authenticated/monitoring/historicalMonitoring
  //---------------------------------------------------

### Other routes :

- http://localhost:5001/admins/authenticated/issueUpkeep
- http://localhost:5001/admins/authenticated/infrastructureIssues

Detta är URL:erna för dem olika endpointerna. Dem kommer tillhandahålla olika handlingar och information som användare och arbetare kan komma åt. Urls har namngets på så vis att dem ska vara hyfsate självförklarande
