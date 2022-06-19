/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

group('@amaui/storage', () => {

  preTo(async () => {
    await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
  });

  group('AmauiStorage', () => {

    preTo(async () => {
      await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
    });

    to('clear', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStorage = new window.AmauiStorage();

        amauiStorage.add('a', 'a');
        amauiStorage.add('ab', 4);
        amauiStorage.add('ad', 4);

        window.localStorage.setItem('a', 'a');

        window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session');

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
      await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
    });

    group('variant', () => {

      preTo(async () => {
        await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
      });

      to('default', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage();

          amauiStorage.add('a', 4);

          return [amauiStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('local', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage({ variant: 'local' });

          amauiStorage.add('a', 4);

          return [amauiStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('session', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage({ variant: 'session' });

          amauiStorage.add('a', 4);

          return [amauiStorage.storage === window.sessionStorage, window.sessionStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

    });

    group('storage', () => {

      preTo(async () => {
        await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
      });

      to('default', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage();

          amauiStorage.add('a', 4);

          return [amauiStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('local', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage({ storage: window.localStorage });

          amauiStorage.add('a', 4);

          return [amauiStorage.storage === window.localStorage, window.localStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

      to('session', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage({ storage: window.sessionStorage });

          amauiStorage.add('a', 4);

          return [amauiStorage.storage === window.sessionStorage, window.sessionStorage.getItem('AMAUI_a')];
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([true, '4']);
        });
      });

    });

    group('namespace', () => {

      preTo(async () => {
        await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
      });

      to('default', async () => {
        const valueBrowsers = await evaluate((window: any) => new window.AmauiStorage().namespace,);
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eq('AMAUI_');
        });
      });

      to('namespace', async () => {
        const valueBrowsers = await evaluate((window: any) => new window.AmauiStorage({ namespace: 'a' }).namespace,);
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eq('a_');
        });
      });

      to('namespace_separator', async () => {
        const valueBrowsers = await evaluate((window: any) => new window.AmauiStorage({ namespace_separator: ',' }).namespace,);
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eq('AMAUI,');
        });
      });

      to('namespace in a localStorage', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage();

          amauiStorage.add('a', 'a');

          return Object.keys(window.localStorage);
        });
        const values = [...valueBrowsers];

        values.forEach(value => {
          assert(value).eql(['AMAUI_a']);
        });
      });

      to('namespace in a session', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStorage = new window.AmauiStorage({ variant: 'session' });

          amauiStorage.add('a', 'a');

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
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 4);
      amauiStorage.add('ab', 4);
      amauiStorage.add('ad', 4);

      return amauiStorage.properties;
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value.sort()).eql(['a', 'ab', 'ad']);
    });
  });

  to('values', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 'a');
      amauiStorage.add('ab', 4);
      amauiStorage.add('ad', 4);

      return amauiStorage.values;
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value.sort()).eql([4, 4, 'a']);
    });
  });

  to('items', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 'a');
      amauiStorage.add('ab', 4);
      amauiStorage.add('ad', 4);

      return amauiStorage.items;
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
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 'a');
      amauiStorage.add('ab', 4);
      amauiStorage.add('ad', 4);

      window.localStorage.setItem('a', 'a');

      amauiStorage.clear;

      return Object.keys(window.localStorage);
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql(['a']);
    });
  });

  to('get', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 'a');

      return amauiStorage.get('a');
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eq('a');
    });
  });

  to('has', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 'a');

      return amauiStorage.has('a');
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eq(true);
    });
  });

  group('add', () => {

    preTo(async () => {
      await evaluate((window: any) => window.AmauiStorage.clear('local') && window.AmauiStorage.clear('session'),);
    });

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStorage = new window.AmauiStorage();

        amauiStorage.add('a', 'a');

        return [amauiStorage.get('a'), Object.keys(window.localStorage)[0]];
      });
      const values = [...valueBrowsers];

      values.forEach(value => {
        assert(value).eql(['a', 'AMAUI_a']);
      });
    });

    to('add reference value', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStorage = new window.AmauiStorage();

        amauiStorage.add('a', 'a');
        amauiStorage.add('ay', true);
        amauiStorage.add('au', [1, 4]);
        amauiStorage.add('ao', { a: 'a' });

        return [amauiStorage.get('a'), amauiStorage.get('ay'), amauiStorage.get('au'), window.localStorage['AMAUI_au'], amauiStorage.get('ao')];
      });
      const values = [...valueBrowsers];

      values.forEach(value => {
        assert(value).eql(['a', true, [1, 4], '[\n  1,\n  4\n]', { a: 'a' }]);
      });
    });

  });

  to('update', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 4);
      amauiStorage.update('a', 'a');

      return [amauiStorage.get('a'), Object.keys(window.localStorage)[0]];
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql(['a', 'AMAUI_a']);
    });
  });

  to('remove', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStorage = new window.AmauiStorage();

      amauiStorage.add('a', 'a');

      amauiStorage.remove('a');

      return [amauiStorage.get('a'), Object.keys(window.localStorage)];
    });
    const values = [...valueBrowsers];

    values.forEach(value => {
      assert(value).eql([null, []]);
    });
  });

});
