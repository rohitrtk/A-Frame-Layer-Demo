AFRAME.registerComponent('spawner', {
  schema: {
    'numItems' : {type: 'number', default: 10000},
    'useLayer' : {type: 'boolean', default: false}
  },

  init: function () {
    // Toggle layer button attached to camera
    let btn = document.createElement('a-entity');
    btn.setAttribute('id', 'button');
    btn.setAttribute('geometry', {
      primitive: 'box',
      width: 0.5,
      height: 0.25,
      depth: 0.1
    });
    btn.setAttribute('material', {
      colour: '#e6e6e6',
      shader: 'flat'
    });
    btn.object3D.position.set(0, -0.6, -1);
    btn.object3D.scale.set(0.8, 0.8);
    btn.setAttribute('text', {
      value: 'Layer',
      color: '#000000',
      width: 2,
      align: 'center',
      zOffset: 0.06
    });
    btn.classList.add('clickable');
    btn.addEventListener('click', event => {
      this.data.useLayer = !this.data.useLayer;
      console.log(`useLayer now set to: ${this.data.useLayer}`);
      this.update();
    });

    let cameraRig = document.getElementById('cameraRig');
    cameraRig.appendChild(btn);
  },

  update: function() {
    let el = this.el;
    let data = this.data;
    
    for(let child of el.children) {
      child.remove();
    }

    // Spawn images/videos/layers
    let x = 0;
    let y = 0;
    let z = -4
    for(let i = 0; i < data.numItems; i++) {
      x = (i % 1000) - 500;
      y = Math.floor(i / 1000) + 1;
      
      let t = null;

      if(!this.data.useLayer) {
        t = document.createElement('a-image');
        t.setAttribute('src', '#project');
      } else {
        t = document.createElement('a-entity');
        t.setAttribute('layer', {
          type: 'quad',
          src: '#project',
          width: 1.080,
          height: 1.080
        });
      }


      t.object3D.position.set(x, y, z);
      
      el.appendChild(t);
    }
  }
});