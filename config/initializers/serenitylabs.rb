# frozen_string_literal: true
module Mastodon
  module Version
    module_function
    def repository
      'serenitylaboratories/mastodon'
    end

    def flags
      'slis'
    end

    def source_base_url
      'https://github.com/serenitylaboratories/mastodon'
    end
  end
end
