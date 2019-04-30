const scroller = scrollama();

mapboxgl.accessToken = 'pk.eyJ1IjoibG9iZW5pY2hvdSIsImEiOiJjajdrb2czcDQwcHR5MnFycmhuZmo4eWwyIn0.nUf9dWGNVRnMApuhQ44VSw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/lobenichou/cjv2qx627b01b1ftlxxj9ukyi',
  center: [-73.908533, 40.752069],
  zoom: 10
});

const mapReset = () => {
  map.easeTo({
    center: [-73.908533, 40.752069],
    zoom: 10
  });
};

map.on('load', () => {
  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'income-per-station-cir', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = d3.format("($,.2f")(e.features[0].properties.incomeMed);

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseleave', 'income-per-station-cir', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('mouseenter', 'income-per-station-hex', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = d3.format("($,.2f")(e.features[0].properties.incomeMed);

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseleave', 'income-per-station-hex', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  const toggleableLayerIds = ['income-per-station-hex', 'income-per-station-cir', 'subway-lines'];

  toggleableLayerIds.forEach((toggleableLayerId) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = toggleableLayerId;
    link.id = toggleableLayerId;
    link.className = map.getLayoutProperty(toggleableLayerId, 'visibility') === 'visible' ? 'active': '';

    link.onclick = function(e) {
      const clickedLayer = this.textContent;
      const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
      e.preventDefault();
      e.stopPropagation();

      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
      } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    const layers = document.getElementById('menu');
    layers.appendChild(link);
  });


  scroller
    .setup({
      step: '.step'
    })
    .onStepEnter(response => {
      const currentStep = response.element.dataset.step;
      const currentDirection = response.direction;
      const directionIs = (step, direction) => {
        return currentStep === step && currentDirection === direction;
      };

      if (directionIs('b', 'down') || directionIs('b', 'up')) {
        map.flyTo({
          center: [-73.977402, 40.746748],
          zoom: 13
        })
      } else if (directionIs('a', 'up')) {
        mapReset();
      } else if (directionIs('c', 'down') || directionIs('c', 'up')) {
        map.flyTo({
          center: [-73.928041, 40.856540],
          zoom: 13,
          pitch: 0
        });
        map.setLayoutProperty('income-per-station-cir', 'visibility', 'visible');
        map.setLayoutProperty('income-per-station-hex', 'visibility', 'none');
      } else if (directionIs('d', 'down') || directionIs('d', 'up')) {
        map.easeTo({
          center: [-73.928852, 40.705214],
          zoom: 11,
          pitch: 45
        })
        map.setLayoutProperty('income-per-station-cir', 'visibility', 'none');
        map.setLayoutProperty('income-per-station-hex', 'visibility', 'visible');
      } else if (directionIs('e', 'down')) {
        mapReset();
        toggleableLayerIds.forEach((toggleableLayerId) => {
          document.getElementById(toggleableLayerId).className = map.getLayoutProperty(toggleableLayerId, 'visibility') === 'visible' ? 'active': '';
        })
      }
    });
});


// setup resize event
window.addEventListener('resize', scroller.resize);
