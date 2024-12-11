/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

group('OnesyStorage', () => {

  preTo(async () => {
    await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
  });

  group('OnesyStorage', () => {

    preTo(async () => {
      await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
    });

    to('clear', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStorage = new window.OnesyStorage();

        onesyStorage.add('a', 'a');
        onesyStorage.add('ab', 4);
        onesyStorage.add('ad', 4);

        window.localStorage.setItem('a', 'a');

        window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session');

        return Object.keys(window.localStorage);
      });
      const values = [...valueBrowsers];

      values.forEach(value => {
        assert(value).eql([]);
      });
    });

  });

  group('options', () => {

    preTo(async () => {
      await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
    });

    group('variant', () => {

      preTo(async () => {
        await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
      });

      to('default', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage();

          onesyStorage.add('a', 4);

          return [onesyStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('local', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage({ variant: 'local' });

          onesyStorage.add('a', 4);

          return [onesyStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('session', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage({ variant: 'session' });

          onesyStorage.add('a', 4);

          return [onesyStorage.storage === window.sessionStorage, window.sessionStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

    });

    group('storage', () => {

      preTo(async () => {
        await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
      });

      to('default', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage();

          onesyStorage.add('a', 4);

          return [onesyStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('local', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage({ storage: window.localStorage });

          onesyStorage.add('a', 4);

          return [onesyStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('session', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage({ storage: window.sessionStorage });

          onesyStorage.add('a', 4);

          return [onesyStorage.storage === window.sessionStorage, window.sessionStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

    });

    group('namespace', () => {

      preTo(async () => {
        await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
      });

      to('default', async () => {
        const valueBrowsers = await evaluate((window: any) => new window.OnesyStorage().namespace,);
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eq('AMAUI_');
        });
      });

      to('namespace', async () => {
        const valueBrowsers = await evaluate((window: any) => new window.OnesyStorage({ namespace: 'a' }).namespace,);
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eq('a_');
        });
      });

      to('namespace_separator', async () => {
        const valueBrowsers = await evaluate((window: any) => new window.OnesyStorage({ namespace_separator: ',' }).namespace,);
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eq('onesy,');
        });
      });

      to('namespace in a localStorage', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage();

          onesyStorage.add('a', 'a');

          return Object.keys(window.localStorage);
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql(['AMAUI_a']);
        });
      });

      to('namespace in a session', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStorage = new window.OnesyStorage({ variant: 'session' });

          onesyStorage.add('a', 'a');

          return Object.keys(window.sessionStorage);
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql(['AMAUI_a']);
        });
      });

    });

  });

  to('properties', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 4);
      onesyStorage.add('ab', 4);
      onesyStorage.add('ad', 4);

      return onesyStorage.properties;
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value.sort()).eql(['a', 'ab', 'ad']);
    });
  });

  to('values', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 'a');
      onesyStorage.add('ab', 4);
      onesyStorage.add('ad', 4);

      return onesyStorage.values;
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value.sort()).eql([4, 4, 'a']);
    });
  });

  to('items', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 'a');
      onesyStorage.add('ab', 4);
      onesyStorage.add('ad', 4);

      return onesyStorage.items;
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql({
        a: 'a',
        ab: 4,
        ad: 4,
      });
    });
  });

  to('clear', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 'a');
      onesyStorage.add('ab', 4);
      onesyStorage.add('ad', 4);

      window.localStorage.setItem('a', 'a');

      onesyStorage.clear;

      return Object.keys(window.localStorage);
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql(['a']);
    });
  });

  to('get', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 'a');

      return onesyStorage.get('a');
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eq('a');
    });
  });

  to('has', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 'a');

      return onesyStorage.has('a');
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eq(true);
    });
  });

  group('add', () => {

    preTo(async () => {
      await evaluate((window: any) => window.OnesyStorage.clear('local') && window.OnesyStorage.clear('session'),);
    });

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStorage = new window.OnesyStorage();

        onesyStorage.add('a', 'a');

        return [onesyStorage.get('a'), Object.keys(window.localStorage)[0]];
      });
      const values = [...valueBrowsers];

      values.forEach(value => {
        assert(value).eql(['a', 'AMAUI_a']);
      });
    });

    to('add reference value', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStorage = new window.OnesyStorage();

        onesyStorage.add('a', 'a');
        onesyStorage.add('ay', true);
        onesyStorage.add('au', [1, 4]);
        onesyStorage.add('ao', { a: 'a' });

        return [onesyStorage.get('a'), onesyStorage.get('ay'), onesyStorage.get('au'), window.localStorage['AMAUI_au'], onesyStorage.get('ao')];
      });
      const values = [...valueBrowsers];

      values.forEach(value => {
        assert(value).eql(['a', true, [1, 4], '[\n  1,\n  4\n]', { a: 'a' }]);
      });
    });

  });

  to('update', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 4);
      onesyStorage.update('a', 'a');

      return [onesyStorage.get('a'), Object.keys(window.localStorage)[0]];
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql(['a', 'AMAUI_a']);
    });
  });

  to('remove', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStorage = new window.OnesyStorage();

      onesyStorage.add('a', 'a');

      onesyStorage.remove('a');

      return [onesyStorage.get('a'), Object.keys(window.localStorage)];
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql([null, []]);
    });
  });

});
